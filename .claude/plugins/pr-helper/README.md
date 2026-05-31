# pr-helper

Plugin interno del equipo Notebox. Empaqueta commands, un hook de auditoria de Bash,
una skill de estilo de commit y un subagente de revision de PRs.

## Que empaqueta

| Componente | Archivo | Para que |
|---|---|---|
| Command `/pr-helper:summary` | `commands/summary.md` | Resume el PR actual a partir del diff |
| Command `/pr-helper:checklist` | `commands/checklist.md` | Devuelve la checklist interna de revision |
| Hook `PreToolUse` | `hooks/pre-bash-audit.sh` | Loguea cada invocacion de Bash a `.claude/audit/bash.log` |
| Skill `commit-msg-style` | `skills/commit-msg-style/SKILL.md` | Aplica el estilo de commit del equipo |
| Agent `pr-reviewer` | `agents/pr-reviewer.md` | Subagente para revisar PRs con plantilla fija |

## Instalacion

El plugin esta plantado en `.claude/plugins/pr-helper/`. Para activarlo:

- Con `/plugin enable pr-helper` si la version de Claude Code lo expone.
- Si no, anadir `pr-helper` a la lista `enabledPlugins` del `.claude/settings.json`
  (o equivalente). Reiniciar la sesion para que el plugin cargue sus commands y hooks.

## Version

`0.1.0` — base. Bump minor al anadir capacidades; major si rompe API existente.
