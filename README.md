# Modelab

Modelab is an asset browser & viewer, intended to host, manage, share and cite works among students.

## Setup

### Configuration

Create and configure `.env` in the projects root (use `.env.example`).

### Running

The simplest way to run Modelab is to use `docker-compose.yaml`:

```shell
docker compose up
```

This will setup a MySQL server and host Modelab on the configured port. It might take a while (especially the first time), but if you see 'setup: Completed successfully' then we are in business >:).   

#### Using your own MySQL

If you want to use your own MySQL server, configure `.env` with your server's credentials. Then remove `modelab_db` from the `docker-compose.yaml` services.

#### Your way

If you want to integrate Modelab into a more specific setup, the `Dockerfile` is yours ;).

### Initial setup

Modelab is now hosted and ready to be used! Except not really, the API has a white list of allowed emails (the default is none) and also the default user role is `user`.

### Development/Testing setup



## Contents

- [Modelab](#modelab)
  - [Setup](#setup)
    - [Configuration](#configuration)
    - [Running](#running)
      - [Using your own MySQL](#using-your-own-mysql)
      - [Your way](#your-way)
    - [Initial setup](#initial-setup)
    - [Development/Testing setup](#developmenttesting-setup)
  - [Contents](#contents)
  - [Features](#features)
  - [Structure](#structure)
    - [Modelab API](#modelab-api)
    - [Modelab Web](#modelab-web)
    - [Docker](#docker)

## Features

- [x] Many supported formats
  - [x] Model - obj + mlt, glb, fbx, stl
  - [x] Image - png, webp, jpg/jpeg, gif, svg, bmp
  - [x] Audio - mp3, ogg, wav, flac
  - [x] Other - zip, mb (MAYA), blend (Blender)
- [x] Application
  - [x] Google authentication
  - [x] Mobile support
  - [x] Light and dark themes
  - [x] Localization (czech and english)
  - [x] Browser
    - [x] Searching and filtering with tags and categories
  - [x] Preview
    - [x] 3D Model live previews with three.js
    - [x] Downloading/Citing
    - [x] Preview for guest users
- [x] Admin tools
  - [x] Asset uploading and managing
  - [ ] Interactive CLI
  - [ ] Database migrations (yikes)
  - [ ] Dashboard
    - [ ] Settings configuration
    - [ ] Data export and import

## Structure

### Modelab API

The backed for Modelab is in PHP 8.3 (without composer), it uses PDO with MySQL 8.0.

[Documentation for Modelab API](./modelab-api/README.md)

### Modelab Web

The frontend for Modelab is made with React + Vite in TypeScript.

[Documentation for Modelab Web](./modelab-web/README.md)

### Docker

Modelab uses docker to streamline deployment. It uses 2 services:

- `modelab_db` - A MySQl database
- `modelab` - Apache PHP server which hosts the full application