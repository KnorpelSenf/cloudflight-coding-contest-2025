FROM mcr.microsoft.com/devcontainers/base:trixie

RUN apt-get update && \
    DEBIEN_FRONTEND=noninteractive apt-get install -y \
    --no-install-recommends \
    ## dev
    vim tmux && \
    ## reduce image size
    rm -rf /var/lib/apt/lists/*

COPY --from=denoland/deno:bin-2.5.6 /deno /usr/local/bin/deno

USER vscode

# set up shell completions for various tools
RUN mkdir -p ~/.local/share/bash-completion/completions && \
    deno completions bash > ~/.local/share/bash-completion/completions/deno
