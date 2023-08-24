const promos = require("../docs/data/promos.json")

const promoController = {
    homePage: (req, res) => {
        res.render('index')
    },
    promosListPage: (req, res) => {
        console.log(promos);
        res.render('promosList', { promos })
    },
    promoPage: (req, res, next) => {
        // "http://localhost:5000/promo/Cosmos/5"

        // const name = req.params.name
        // const id = req.params.id

        // destructuring
        const { name: promoName, id: reqId } = req.params

        console.log(promoName);
        console.log(reqId);

        const promo = promos.find(promo => promo.id === Number(reqId))

        // promo = {
        //     id: number;
        //     name: string;
        //     github_organization: string;
        // }

        console.log(promo);

        if (!promo) {
            res.locals.error = { code: 404, message: "Aucune promo correspondante !" }
            return next()
        }

        return res.render('promo', { promo })
    }
}

module.exports = promoController;