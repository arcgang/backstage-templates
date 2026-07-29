# ${{ values.name }}

${{ values.description }}

Owner: `${{ values.owner }}`

## Contents

{% if 'runbook' in values.documents %}
- **[Runbook](runbook.md)** — how to operate this service, and what to do when
  it breaks.
{% endif %}
{%- if 'system-architecture' in values.documents %}
- **[System architecture](system-architecture.md)** — how the system is built
  and how its parts interact.
{% endif %}
{%- if 'command-reference' in values.documents %}
- **[Command reference](command-reference.md)** — commands for working with
  this service.
{% endif %}

Each page starts as a template from the Backstage community documentation
templates. Replace the prompt text under each heading with your own content,
and delete sections that don't apply.
