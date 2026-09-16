# Catálogo Técnico — Solução / Blindex

Catálogo técnico de referência dos sistemas de envidraçamento (sacadas, grandes vãos, pele de vidro) produzidos pela Solução Fechamento Inteligente, sob licença Blindex®.

Publicado via GitHub Pages a partir da pasta `/docs` (branch `main`).

## Estrutura

```
src/
  data/
    marcas.yaml          # nomes comerciais + cores por marca (Solução azul / Blindex vermelho)
    categorias/*.yaml     # conteúdo técnico neutro de marca (tipologia, limites, montagem, usinagem)
    perfis/*.yaml         # ficha de cada código de perfil (peso, área, inércia, imagens)
    biblioteca.yaml       # dados da página "Mapa geral de perfis"
    selantes.yaml         # dados da página "Linha de Selantes"
  templates/               # templates Jinja2 (base, capa, produto genérico, partials por tipo de bloco)
  assets/                  # css, js e imagens finais (fonte para o build)
  build.py                 # gera o site estático em /docs a partir de data/ + templates/
docs/                      # SAÍDA GERADA — nunca editar à mão, é sobrescrita a cada build
referencia/                # protótipo HTML monolítico original (histórico, não editar)
cad-fonte/                 # (fora do Git) arquivos CAD brutos — ver .gitignore
```

## Decisão de arquitetura: dado técnico × marca

4 das 6 categorias técnicas existem sob duas marcas (Solução e Blindex) com conteúdo técnico idêntico. Para nunca duplicar esse conteúdo:

- `src/data/categorias/*.yaml` guarda o conteúdo técnico **uma única vez**, sem menção a nome comercial.
- `src/data/marcas.yaml` mapeia cada categoria ao nome comercial e cor de cada marca.
- `src/build.py` renderiza uma página por combinação (categoria × marca) que existir — pulando as combinações que uma marca não tem (ex: Blindex não tem Ripado nem Persianas).

Perfis de alumínio seguem a mesma lógica: cada código tem um único arquivo YAML com um campo `categorias:` listando quem o usa — a tabela de compartilhamento na biblioteca de perfis é **derivada automaticamente** desse campo, nunca mantida manualmente.

## Convenção de imagens de perfil

Arquivo nomeado por código + nome do detalhe, nunca abreviação: `SS-001-trilho-inferior.jpg` (desenho cotado) e `SS-001-trilho-inferior-isometrico.jpg` (isométrica, quando houver). O nome exato do arquivo é declarado nos campos `imagem_desenho:` / `imagem_isometrica:` do YAML do perfil — o build nunca infere o nome a partir do código.

## Como gerar o site

```bash
pip install -r src/requirements.txt
python src/build.py
```

Isso recria `/docs` do zero a partir de `src/data` e `src/templates`. Abra `docs/index.html` no navegador para conferir antes de comitar.

## Ordem de construção das marcas

A camada **Solução** (azul) é construída e validada primeiro para as 6 categorias. A camada **Blindex** (vermelho) entra depois, como uma segunda passada de tema sobre os mesmos dados — basta adicionar as entradas em `marcas.yaml` e incluir `"blindex"` na lista `MARCAS_ATIVAS` no topo de `src/build.py`.
