const students = require('../docs/data/students.json')
const promos = require('../docs/data/promos.json')

// const students = [
//     {
//         "id": 8254,
//         "first_name": "Houd",
//         "last_name": "ALAMI MARROUNI",
//         "github_username": "HoudAlami",
//         "promo": 663,
//         "profile_picture_url": "https://github.com/HoudAlami.png"
//     },
//     ...
// ]

const studentController = {

    studentsByPromoPage: (req, res, next) => {
        const { id } = req.params
        // je formatte mon id qui est une string (car provenant des paramètres d'URL) pour pouvoir le comparer à des entiers (l'id dans les données JSON)
        const promoId = Number(id)

        const promo = studentController.getPromoById(promoId)

        if (!promo) {
            res.locals.error = { code: 404, message: "Aucune promo correspondante !" }
            return next()
        }

        const studentList = studentController.getStudentsByPromo(promoId)

        if (!studentList.length) {
            res.locals.error = { code: 404, message: "Aucune promo correspondante !" }
            return next()
        }

        res.render('students', { studentList, promo })
    },

    getPromoById: (promoId) => {
        const data = promos.find(promo => promo.id === promoId)
        return data;
    },

    getStudentsByPromo: (promoId) => {
        const data = students.filter(student => student.promo === promoId)
        console.log(data);
        return data;
    }

}

module.exports = studentController;