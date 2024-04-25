const mongoose = require('mongoose');
const chalk = require('chalk');

async function connect() {
    mongoose.set('strictQuery', false);
    try {
        console.log(chalk.blue(chalk.bold(`Base de donné`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`est connecté ...`))
        await mongoose.connect(process.env.MONGO_TOKEN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(chalk.red(`[Erreur]`), chalk.white(`>>`), chalk.red(`MongoDB`), chalk.white(`>>`), chalk.red(`Echec de la connexion!`), chalk.white(`>>`), chalk.red(`Erreur: ${err}`))
        console.log(chalk.red("Sortie..."))
        process.exit(1)
    }


    mongoose.connection.once("open", () => {
        console.log(chalk.blue(chalk.bold(`Base de donné`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`est prêt !`))
    });

    mongoose.connection.on("error", (err) => {
        console.log(chalk.red(`[Erreur]`), chalk.white(`>>`), chalk.red(`Base de donné`), chalk.white(`>>`), chalk.red(`Echec de la conexion`), chalk.white(`>>`), chalk.red(`Erreur: ${err}`))
        console.log(chalk.red("Sortie..."))
        process.exit(1)
    });
    return;
}

module.exports = connect