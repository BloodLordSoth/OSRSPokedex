#!/usr/bin/env bash
set -e

# Install Chromium
apt-get update
apt-get install -y chromium-browser

# Install Node dependencies
npm install
