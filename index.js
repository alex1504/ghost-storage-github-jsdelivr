const utils = require("util");
const { readFile } = require("fs");
const BaseAdapter = require("ghost-storage-base");
const { GhImgUploader } = require("github-image-uploader");
const readFileP = utils.promisify(readFile);

class GithubStorageCdnAdapter extends BaseAdapter {
  constructor(options) {
    super(options);
    this.options = options || {};
  }

  /**
   * Upload img to github and get jsdelivr link
   * @param image
   * @param targetDir
   * @returns {Promise}
   */
  save(image, targetDir) {
    const { token, owner, repos, dir, branch, filenameHandler, resolveLink } =
      this.options;

    if (!token || !owner || !repos) {
      return Promise.reject("GithubStorageCdnAdapter not configured");
    }

    const resolveLinkKey = resolveLink || "cdnLink";
    const uploader = new GhImgUploader({
      token,
      owner,
      repos,
      dir: dir || "ghost/",
      branch: branch || "master"
    });

    return new Promise(async (resolve, reject) => {
      const base64Img = await readFileP(image.path, { encoding: "base64" });

      uploader
        .upload({
          base64Img,
          filename: image.name,
          filenameHandler: filenameHandler || "date"
        })
        .then((result) => {
          resolve(result[resolveLinkKey]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @Overwrite
   * Ghost requires this function to be defined
   */
  exists(filename, targetDir) {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }

  /**
   * @Overwrite
   * Ghost requires this function to be defined
   */
  serve() {
    return (req, res, next) => {
      next();
    };
  }

  /**
   * Not implemented.
   * May be implemented later.
   *
   * @returns {Promise.<*>}
   */
  delete() {
    return Promise.reject("not implemented");
  }

  /**
   * @Overwrite
   * Absolute url are already used to link to the images
   */
  read(options) {}
}

module.exports = GithubStorageCdnAdapter;
