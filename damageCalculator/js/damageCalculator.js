var COMBAT_LVL, WeaponDMG, Strength, CritDamage, Speed, WeaponBonus, ArmorBonus, EnchantMult;

var COMBAT_BOOST = ()=>{
	if(COMBAT_LVL<51){
		return COMBAT_LVL * 0.04
	}
	
	return (200 + (COMBAT_LVL-50))/100
}
function baseDamage(old, WARDEN_BONUS){
	 //Warden Helmet says it increases BaseDamage, I confirmed this ingame
	 let warden = (1+WARDEN_BONUS*Math.floor(Speed/50)/10*old)
	if(old) return (5 + WeaponDMG + Strength/5) * (1 + Strength/100) * warden; //Old Calculations
	return (5 + WeaponDMG) * (1 + Strength/100) * warden;
}


function damageCalc(old=false, WARDEN_BONUS=false){
	var BaseDamage = baseDamage(old, WARDEN_BONUS);
	var newWarden = (WARDEN_BONUS*Math.floor(Speed/50)/5*!old);
	var DamageMultiplier = 1 + COMBAT_BOOST() + EnchantMult/100 + WeaponBonus/100 + newWarden;

	return prettyNumber(BaseDamage * DamageMultiplier * (1+CritDamage/100) * (1+ArmorBonus/100))
}


function prettyNumber(n){
  return Math.floor(n).toLocaleString('en-US',{maximumFractionDigits: 0})
}

function printDamage(){
	let inputs = document.querySelectorAll('input');
	COMBAT_LVL = Number(inputs[4].value);
	WeaponDMG = Number(inputs[5].value);
	Strength = Number(inputs[6].value);
	CritDamage = Number(inputs[7].value);
	Speed = Number(inputs[8].value);;
	WeaponBonus = Number(inputs[9].value);;
	ArmorBonus = Number(inputs[10].value);;

	let enchantments = document.querySelectorAll('.enchantments select');
	let sharp = Number(enchantments[0].value) * Number(inputs[0].value);
	inputs[0].parentElement.lastElementChild.innerHTML = ` +${sharp}%`;
	let strike = Number(enchantments[1].value) * Number(inputs[1].value);
	inputs[1].parentElement.lastElementChild.innerHTML = ` +${strike}%`;
	let giantk = Number(inputs[9].value) ? 25 : 0;
	inputs[2].parentElement.lastElementChild.innerHTML = ` +${giantk}%`;
	let prosecute = Number(inputs[10].value) ? 35 : 0;
	inputs[3].parentElement.lastElementChild.innerHTML = ` +${prosecute}%`;

	EnchantMult = sharp + strike + giantk + prosecute;

	let oldWarden = damageCalc(true, true);
	let oldDmg = damageCalc(true, false);

	let newWarden =damageCalc(false, true);
	let newDmg = damageCalc(false, false);

	let results = document.querySelectorAll('.result');

	results[0].innerHTML = oldWarden;
	results[1].innerHTML = oldDmg;
	results[2].innerHTML = newWarden;
	results[3].innerHTML = newDmg;
}
printDamage();
document.querySelector('.stats').oninput = printDamage;
document.querySelector('.enchantments').oninput = printDamage;


//Jerry
function jerry(){
	let stats = document.querySelector('.stats')
	let ench = document.querySelector('.enchantments')
	let results = document.querySelector('.results')

	stats.classList.toggle('jerry')
	ench.classList.toggle('jerry')
	results.classList.toggle('jerry')

	localStorage.jerry = Number(!parseInt(localStorage.jerry))
}

if(Number(localStorage.jerry)){
	document.querySelector('.stats').classList.add('jerry')
	document.querySelector('.enchantments').classList.add('jerry')
	document.querySelector('.results').classList.add('jerry')
}
