var mongoose = require('mongoose');
var ProdutosSchema = mongoose.Schema({
    nome: String,
    valor: Number,
})
mongoose.model('Produtos', ProdutosSchema);