config = require('../config');
scripts = config.get('scripts');
scripts[0] = './galery.js';
styles = config.get('style');

exports.index = function(req,res){
if (req.params.id) {
var index = req.params.id;
} else {var index = 'index';}
var mainText = require('../models/mainText').mainText;
    mainText.findOne({'url':index}, function(err, text){
	if(!text){
	text = {
	name: ' Welcome',
	body: ' Sorry, page not found'
	}
	}

res.render('index',{text:text,});
});
};

exports.add = function(req,res){
var MainText = require('../models/mainText').mainText;
var mainText = new MainText({
name:'mainpage2',
body: '<h3> Добро пожаlовать на сайт!</h3><p>Здоровое питание (здоровая диета, англ. healthy diet) — это питание, обеспечивающее рост, нормальное развитие и жизнедеятельность человека, способствующее укреплению его здоровья и профилактике заболеваний. Соблюдение правил здорового питания в сочетании с регулярными физическими упражнениями сокращает риск хронических заболеваний и расстройств, таких как ожирение, сердечно-сосудистые заболевания, диабет, повышенное давление и рак.Современная наука проводит многочисленные исследования, чтобы оптимизировать рацион питания для профилактики основных хронических заболеваний.</p><p>Первое полномасштабное исследование, подтвердившее, что диета может значительно снизить проблемы с сердечно-сосудистыми заболеваниями, ожирением и диабетом стал проект Северная Карелия, проведенный в Финляндии с 1973 г. За 35 лет у населения области Северной Карелии смертность от сердечно-сосудистых заболеваний снизилась в 7 раз. Этот результат лег в основу общеевропейской Стратегии по здравоохранению 2020.</p>',
url: 'index2',
});
mainText.save(function(err, user, affected) {
console.log('Ok');
});
res.redirect('/');
}