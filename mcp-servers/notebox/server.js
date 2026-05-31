#!/usr/bin/env node
/**
 * Servidor MCP propio del repo Notebox.
 *
 * Transporte: stdio. Lanzado por Claude Code como proceso hijo según
 * la configuración en `.mcp.json`.
 *
 * Expone:
 *   - Tools: notebox_list_notes, notebox_get_note, notebox_create_note,
 *            notebox_archive_note, notebox_delete_note.
 *   - Resources: notebox://notes (listado completo en JSON).
 *   - Resource templates: notebox://note/{id} (una nota por id).
 *
 * Persistencia: in-memory dentro del proceso del servidor MCP. No habla
 * con el HTTP Notebox (src/server.ts) — es deliberado para que el ejercicio
 * funcione sin arrancar dos servicios.
 *
 * Convenciones:
 *   - Nombres de tools en snake_case con prefijo `notebox_`.
 *   - inputSchema en JSON Schema con `required` explícito.
 *   - Errores estructurados: `{ isError: true, content: [{ type: "text", text: JSON.stringify({ code, message }) }] }`.
 *   - Nunca lanzamos excepciones al cliente: si algo falla, se envuelve.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// --- Estado in-memory ---------------------------------------------------

/** @type {{ id: string, title: string, body: string, archived: boolean }[]} */
const notes = [
  { id: '1', title: 'Bienvenida a Notebox', body: 'Esta nota viene plantada en el servidor MCP.', archived: false },
  { id: '2', title: 'TODO de la sesión', body: 'Configurar MCP, gobernar tools, extender el servidor.', archived: false },
  { id: '3', title: 'Idea archivada', body: 'Se guardó hace tiempo y ya no aplica.', archived: true },
];

let nextId = 4;

// --- Helpers ------------------------------------------------------------

function ok(payload) {
  return {
    content: [{ type: 'text', text: JSON.stringify(payload) }],
  };
}

function fail(code, message) {
  return {
    isError: true,
    content: [{ type: 'text', text: JSON.stringify({ code, message }) }],
  };
}

// --- Catálogo de tools --------------------------------------------------

const TOOLS = [
  {
    name: 'notebox_list_notes',
    description:
      'Lista todas las notas del almacén. Acepta filtro opcional por estado de archivado. ' +
      'No usar para obtener una nota concreta por id; usa notebox_get_note.',
    inputSchema: {
      type: 'object',
      properties: {
        archived: {
          type: 'boolean',
          description: 'Si se pasa, filtra por archivadas (true) o activas (false).',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'notebox_get_note',
    description:
      'Devuelve una nota concreta por id. Si la nota no existe, devuelve un error estructurado NOT_FOUND.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Identificador de la nota.' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'notebox_create_note',
    description:
      'Crea una nota nueva con title y body. La nota se crea como no archivada. ' +
      'No usar para duplicar; el servidor todavía no expone duplicate.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, description: 'Título de la nota.' },
        body: { type: 'string', description: 'Cuerpo de la nota.' },
      },
      required: ['title', 'body'],
      additionalProperties: false,
    },
  },
  {
    name: 'notebox_archive_note',
    description:
      'Archiva una nota existente. Si ya estaba archivada, devuelve el estado actual sin cambios. ' +
      'OPERACIÓN MUTANTE: considerar denylist en proyectos de producción.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Identificador de la nota a archivar.' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'notebox_delete_note',
    description:
      'Borra una nota del almacén de forma irreversible. ' +
      'OPERACIÓN DESTRUCTIVA: en proyectos reales debe ir en denylist o detrás de allowlist explícita.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Identificador de la nota a borrar.' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
];

// --- Catálogo de resources ---------------------------------------------

const RESOURCES = [
  {
    uri: 'notebox://notes',
    name: 'Notebox notes',
    description: 'Listado completo de notas en JSON.',
    mimeType: 'application/json',
  },
];

const RESOURCE_TEMPLATES = [
  {
    uriTemplate: 'notebox://note/{id}',
    name: 'Notebox note by id',
    description: 'Una nota concreta del almacén identificada por id.',
    mimeType: 'application/json',
  },
];

// --- Server -------------------------------------------------------------

const server = new Server(
  { name: 'notebox', version: '0.1.0' },
  { capabilities: { tools: {}, resources: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: RESOURCES }));

server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
  resourceTemplates: RESOURCE_TEMPLATES,
}));

server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  const { uri } = req.params;

  if (uri === 'notebox://notes') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(notes),
        },
      ],
    };
  }

  const match = /^notebox:\/\/note\/(.+)$/.exec(uri);
  if (match) {
    const id = match[1];
    const note = notes.find((n) => n.id === id);
    if (!note) {
      throw new Error(`Note ${id} not found`);
    }
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(note),
        },
      ],
    };
  }

  throw new Error(`Unknown resource URI: ${uri}`);
});

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args = {} } = req.params;

  try {
    switch (name) {
      case 'notebox_list_notes': {
        const { archived } = args;
        const filtered =
          typeof archived === 'boolean' ? notes.filter((n) => n.archived === archived) : notes;
        return ok(filtered);
      }

      case 'notebox_get_note': {
        const { id } = args;
        if (typeof id !== 'string' || id.length === 0) {
          return fail('INVALID_INPUT', 'id is required and must be a non-empty string');
        }
        const note = notes.find((n) => n.id === id);
        if (!note) return fail('NOT_FOUND', `Note ${id} not found`);
        return ok(note);
      }

      case 'notebox_create_note': {
        const { title, body } = args;
        if (typeof title !== 'string' || title.length === 0) {
          return fail('INVALID_INPUT', 'title is required and must be a non-empty string');
        }
        if (typeof body !== 'string') {
          return fail('INVALID_INPUT', 'body is required and must be a string');
        }
        const note = { id: String(nextId++), title, body, archived: false };
        notes.push(note);
        return ok(note);
      }

      case 'notebox_archive_note': {
        const { id } = args;
        if (typeof id !== 'string' || id.length === 0) {
          return fail('INVALID_INPUT', 'id is required and must be a non-empty string');
        }
        const note = notes.find((n) => n.id === id);
        if (!note) return fail('NOT_FOUND', `Note ${id} not found`);
        note.archived = true;
        return ok(note);
      }

      case 'notebox_delete_note': {
        const { id } = args;
        if (typeof id !== 'string' || id.length === 0) {
          return fail('INVALID_INPUT', 'id is required and must be a non-empty string');
        }
        const idx = notes.findIndex((n) => n.id === id);
        if (idx === -1) return fail('NOT_FOUND', `Note ${id} not found`);
        const [removed] = notes.splice(idx, 1);
        return ok({ deleted: true, note: removed });
      }

      default:
        return fail('UNKNOWN_TOOL', `Tool ${name} is not implemented in this server`);
    }
  } catch (err) {
    return fail('HANDLER_ERROR', err instanceof Error ? err.message : String(err));
  }
});

// --- Arranque ----------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // No usamos console.log: el stdout es el canal del protocolo MCP.
  // Cualquier log de diagnóstico va a stderr.
  console.error('[notebox-mcp] server ready on stdio');
}

main().catch((err) => {
  console.error('[notebox-mcp] fatal:', err);
  process.exit(1);
});
