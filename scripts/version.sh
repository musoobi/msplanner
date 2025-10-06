#!/bin/bash

# Version management script for MS Planner integration
# Usage: ./scripts/version.sh [patch|minor|major|show]

VERSION_FILE="VERSION"
CHANGELOG_FILE="CHANGELOG.md"

# Get current version
get_current_version() {
    if [ -f "$VERSION_FILE" ]; then
        cat "$VERSION_FILE"
    else
        echo "0.1.0"
    fi
}

# Increment version
increment_version() {
    local version=$1
    local type=$2
    
    IFS='.' read -ra ADDR <<< "$version"
    major=${ADDR[0]}
    minor=${ADDR[1]}
    patch=${ADDR[2]}
    
    case $type in
        "patch")
            patch=$((patch + 1))
            ;;
        "minor")
            minor=$((minor + 1))
            patch=0
            ;;
        "major")
            major=$((major + 1))
            minor=0
            patch=0
            ;;
    esac
    
    echo "$major.$minor.$patch"
}

# Update version file
update_version() {
    local new_version=$1
    echo "$new_version" > "$VERSION_FILE"
    echo "Version updated to: $new_version"
}

# Update changelog with Planner-specific sections
update_changelog() {
    local version=$1
    local date=$(date +"%Y-%m-%d")
    
    if [ ! -f "$CHANGELOG_FILE" ]; then
        cat > "$CHANGELOG_FILE" << EOF
# Changelog

All notable changes to this Microsoft Planner integration project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial Microsoft Graph Planner API integration
- Support for basic plan and task operations
- Authentication with Microsoft 365

### Changed

### Deprecated

### Removed

### Fixed

### Security

EOF
    fi
    
    # Add new version to changelog
    sed -i "2i\\\n## [$version] - $date" "$CHANGELOG_FILE"
}

# Main script logic
case "$1" in
    "patch"|"minor"|"major")
        current_version=$(get_current_version)
        new_version=$(increment_version "$current_version" "$1")
        update_version "$new_version"
        update_changelog "$new_version"
        echo "Version bumped from $current_version to $new_version"
        ;;
    "show")
        echo "Current version: $(get_current_version)"
        ;;
    *)
        echo "Usage: $0 [patch|minor|major|show]"
        echo "  patch: 0.1.0 -> 0.1.1 (bug fixes, API updates)"
        echo "  minor: 0.1.0 -> 0.2.0 (new Planner features, API enhancements)"
        echo "  major: 0.1.0 -> 1.0.0 (breaking changes, major API version updates)"
        echo "  show:  display current version"
        exit 1
        ;;
esac
