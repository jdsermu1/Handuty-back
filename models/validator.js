const categories = ["Carpintería", "Cerrajería", "Electricista", "Fumigación", "Jardinería", "Limpieza", "Mascotas", "Mantenimiento", "Pintura", "Plomería", "Seguridad"];


function categoryValidator(category) {
    return categories.includes(category);
}


function dateValidator(date) {
    return new Date().getFullYear() - date.getFullYear() >= 18;
}

module.exports.dateValidator = dateValidator;
module.exports.categoryValidator = categoryValidator;
module.exports.Categorias = categories;