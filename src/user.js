export default class User {
    constructor(settings, projects, ) {
        this.settings = settings;
        this.projects = projects;
    }

    setInitialProject () {
        this.projects = [];
    }

    setInitialSettings () {
        this.settings = {};
    }
}