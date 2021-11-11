Ghost adapter for upload to github and get accelerated link.

# Adapter Usage

```sh
mkdir -p content/adapters/storage
cp node_modules/ghost-storage-github-jsdelivr/index.js content/adapters/storage/ghost-storage-github-jsdelivr.js
```

```json
{
  "storage": {
    "active": "ghost-storage-github-jsdelivr",
    "ghost-storage-github-jsdelivr": {
      "token": "",
      "owner": "",
      "repos": "",
      "dir": "/ghost", // default is '/ghost'
      "branch": "master", // default is 'master'
      "filenameHandler": "date", // 'date' or 'hash'
      "resolveLink": "cdnLink" // 'cdnLink' or 'ghLink'
    }
  }
}
```
