export class DataSuite {
  datasetNick: string;
  gitRepoOwner: string;

  constructor(public name, public title) {
  }

  withDatasetNick(datasetNick: string) {
    this.datasetNick = datasetNick;

    return this;
  }

  withGitRepoOwner(gitRepoOwner: string) {
    this.gitRepoOwner = gitRepoOwner;

    return this;
  }

  getDataset() {
    return `${this.gitRepoOwner}/${this.datasetNick}`;
  }
}
