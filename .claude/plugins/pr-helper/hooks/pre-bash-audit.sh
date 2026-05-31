#!/usr/bin/env bash
# PreToolUse hook del plugin pr-helper.
# Recibe por stdin el JSON del evento. Loguea cada invocacion de Bash a
# .claude/audit/bash.log. En tema-21/inicio NO bloquea ningun comando:
# el Ejercicio 2 pide al alumno extenderlo para bloquear rm -rf y .env.

set -u

# Garantizar que el directorio de audit existe (puede no estar la primera vez).
mkdir -p .claude/audit

input="$(cat)"

# Parseo con jq si esta disponible; fallback a node si no.
if command -v jq >/dev/null 2>&1; then
  tool="$(echo "$input" | jq -r '.tool_name // ""')"
  cmd="$(echo "$input" | jq -r '.tool_input.command // ""')"
else
  tool="$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log(JSON.parse(d).tool_name||"")}catch(e){console.log("")}})' <<< "$input")"
  cmd="$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log((JSON.parse(d).tool_input||{}).command||"")}catch(e){console.log("")}})' <<< "$input")"
fi

ts="$(date -Iseconds 2>/dev/null || date)"
echo "[$ts] $tool: $cmd" >> .claude/audit/bash.log
exit 0
