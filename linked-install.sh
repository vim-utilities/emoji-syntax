#!/usr/bin/env bash


## Find true directory script resides in, true name, and true path
__SOURCE__="${BASH_SOURCE[0]}"
while [[ -h "${__SOURCE__}" ]]; do
    __SOURCE__="$(find "${__SOURCE__}" -type l -ls | sed -n 's@^.* -> \(.*\)@\1@p')"
done
__DIR__="$(cd -P "$(dirname "${__SOURCE__}")" && pwd)"
__DIR_NAME__="${__DIR__##*/}"
__NAME__="${__SOURCE__##*/}"
__PATH__="${__DIR__}/${__NAME__}"
__AUTHOR__='S0AndS0'
__DESCRIPTION__='Links plugin files, syntax extensions, and documentation files for Vim'


_documentation_source_directory="${__DIR__}/doc"
_documentation_destination_directory="${HOME}/.vim/doc"

_syntax_source_directory="${__DIR__}/after/syntax"
_syntax_destination_directory="${HOME}/.vim/after/syntax"

_plugin_source_directory="${__DIR__}/plugin"
_plugin_destination_directory="${HOME}/.vim/plugin/${__DIR_NAME__}"


##
__license__(){
    _year="$(date +'%Y')"
    cat <<EOF
${__DESCRIPTION__}
Copyright (C) ${_year:-2020} ${__AUTHOR__:-"S0AndS0"}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
EOF
}


##
__usage__() {
    local _message="${1}"
    cat <<EOF
${__DESCRIPTION__}


--help      -h

    Prints this message and exists


--license   -l

    Prints license and exits


--verbose   -v

    Prints messages about skipped actions
EOF

  (("${#_message}")) && {
    printf >&2 '\n## Error: %s\n' "${_message}"
  }
}


##
link_syntax_directories() {
  local _syntax_source_directory="${1:?No syntax source directory provided}"
  local _syntax_destination_directory="${2:?No syntax destination directory provided}"

  while read -r _syntax_name; do
    local _syntax_source_path="${_syntax_source_directory}/${_syntax_name}"
    local _syntax_destination_path="${_syntax_destination_directory}/${_syntax_name}"

    [[ -d "${_syntax_destination_path}" ]] || {
      mkdir -vp "${_syntax_destination_path}"
    }

    while read -r _syntax_path; do
      local _syntax_file="${_syntax_path##*/}"
      local _syntax_source_file="${_syntax_source_path}/${_syntax_file}"
      local _syntax_destination_file="${_syntax_destination_path}/${_syntax_file}"

      [[ -L "${_syntax_destination_file}" ]] || [[ -f "${_syntax_destination_file}" ]] && {
        if ((_verbose)); then
          printf 'Skipped linking syntax: %s\n' "${_syntax_name}/${_syntax_file}"
        fi
      } || {
        ln -vs "${_syntax_source_file}" "${_syntax_destination_file}"
      }
    done < <(ls "${_syntax_source_path}/"*.vim)

  done < <(ls "${_syntax_source_directory}")
}


##
link_plugin_directory() {
  local _plugin_source_directory="${1:?No plugin source directory provided}"
  local _plugin_destination_directory="${2:?No plugin destination directory provided}"
  local _plugin_destination_path="${_plugin_destination_directory}/plugin"
  [[ -d "${_plugin_destination_directory}" ]] || {
    mkdir -vp "${_plugin_destination_directory}"
  }

  [[ -L "${_plugin_destination_path}" ]] || [[ -d "${_plugin_destination_path}" ]] && {
    printf 'Skipped linking plugin: %s\n' "${_plugin_destination_path}"
  } || {
    ln -sv "${_plugin_source_directory}" "${_plugin_destination_directory}"
  }
}


##
link_documentation_files(){
  local _documentation_source_directory="${1:?No documentation source provided}"
  local _documentation_destination_directory="${2:?No documentation destination provided}"

  [[ -d "${_documentation_source_directory}" ]] || {
    printf >&2 'Skipping documentation linking\n'
    return 1
  }

  while read -r _documentation_source_path; do
    local _documentation_destination_path="${_documentation_destination_directory}/${_documentation_source_path##*/}"

    [[ -L "${_documentation_destination_path}" ]] || [[ -f "${_documentation_destination_path}" ]] && {
      printf 'Skipped linking documentation: %s\n' "${_documentation_source_path##*/}"
    } || {
      ln -sv "${_documentation_source_path}" "${_documentation_destination_path}"
    }
  done < <(ls "${_documentation_source_directory}/"*.txt)
}


##
update_documentation_tags(){
  vim -c ":helptags ${HOME}/.vim/doc" -c ':q'
}


##
(("${#@}")) && {
  case "${@}" in
    '-h'|'--help'|'help')
      __usage__
      exit 0
    ;;
    '-l'|'--license'|'license')
      __license__
      exit 0
    ;;
    '-v'|'--verbose'|'verbose')
      _verbose=1
    ;;
    *)
      __usage__ "Unrecognized argument(s): ${@}"
      exit 1
    ;;
  esac
}


[[ -d "${HOME}/.vim" ]] || {
  printf >&2 'Cannot find "~/.vim" directory\n'
  exit 1
}


##
link_syntax_directories "${_syntax_source_directory}" "${_syntax_destination_directory}"
link_plugin_directory "${_plugin_source_directory}" "${_plugin_destination_directory}"

link_documentation_files "${_documentation_source_directory}" "${_documentation_destination_directory}"
[[ -d "${_documentation_source_directory}" ]] && {
  update_documentation_tags
}

