Ghost adapter for upload to github and get accelerated link.

# Adapter Usage

```sh
mkdir -p content/adapters/storage/ghost-storage-github-jsdelivr
cp node_modules/ghost-storage-github-jsdelivr/index.js content/adapters/storage/ghost-storage-github-jsdelivr/index.js
```

```json
{
  "storage": {
    "active": "ghost-storage-github-jsdelivr",
    "ghost-storage-github-jsdelivr": {
      "token": "",
      "owner": "",
      "repos": "",
      "dir": "ghost/",
      "branch": "master",
      "filenameHandler": "date",
      "resolveLink": "cdnLink"
    }
  }
}
```

| Key             | Type   | Default | Description                                                                                                      |
| --------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| token           | string |         | required, github token                                                                                           |
| owner           | string |         | required, github username                                                                                        |
| repos           | string |         | required, github repos name                                                                                      |
| dir             | string | ghost/  | optional, upload directory, empty string means root dir. eg: sub/                                                |
| branch          | string | master  | optional, github repos branch                                                                                    |
| filenameHandler | string | date    | optional, filename handler. By default will prefix filename with date string. Pass 'hash' to get hashed filename |
| resolveLink     | string | cdnLink | optional, upload result link. By default is jsdelivr link, pass 'ghLink' to get raw link                         |
