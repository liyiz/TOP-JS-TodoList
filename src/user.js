export default class User {
    constructor(settings, projects) {
        this.settings = settings;
        this.projects = projects;
    }

    setInitialProject () {
        this.projects = [];
    }

    setInitialSettings () {
        this.settings = {};
    }

    deleteProject (index) {
        this.projects.splice(index, 1);
        return console.log(`Project index ${index} deleted.`);
    }
}