module.exports = (app) => {
    var ProdutosSchema = app.get("mongoose").Schema({
        nome: String,
        valor: Number,
    })
    app.get("mongoose").model('Produtos', ProdutosSchema);
}