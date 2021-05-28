var COMBAT_LVL, WeaponDMG, Strength, CritDamage, Speed, WeaponBonus, ArmorBonus, EnchantMult;

var COMBAT_BOOST = ()=>{
	if(COMBAT_LVL<51){
		return COMBAT_LVL * 0.04
	}
	
	return (200 + (COMBAT_LVL-50))/100
}
function baseDamage(old, WARDEN_BONUS){
	 //Warden Helmet says it increases BaseDamage, I confirmed this ingame
	 let warden = (1+WARDEN_BONUS*Math.floor(Speed/50)/10)
	if(old) return (5 + WeaponDMG + Strength/5) * (1 + Strength/100) * warden; //Old Calculations
	return (5 + WeaponDMG) * (1 + Strength/100) * warden;
}


function damageCalc(old=false, WARDEN_BONUS=false){
	var BaseDamage = baseDamage(old, WARDEN_BONUS);
	var DamageMultiplier = 1 + COMBAT_BOOST() + EnchantMult/100 + WeaponBonus/100;

	return prettyNumber(BaseDamage * DamageMultiplier * (1+CritDamage/100) * (1+ArmorBonus/100))
}


function prettyNumber(n){
  return Math.floor(n).toLocaleString('en-US',{maximumFractionDigits: 0})
}

function printDamage(){
	let inputs = document.querySelectorAll('input');
	COMBAT_LVL = Number(inputs[0].value);
	WeaponDMG = Number(inputs[1].value);
	Strength = Number(inputs[2].value);
	CritDamage = Number(inputs[3].value);
	Speed = Number(inputs[4].value);;
	WeaponBonus = Number(inputs[5].value);;
	ArmorBonus = Number(inputs[6].value);;

	let enchantments = document.querySelectorAll('.enchantments select');
	let sharp = Number(enchantments[0].value) * Number(inputs[7].value);
	inputs[7].parentElement.lastElementChild.innerHTML = ` +${sharp}%`;
	let strike = Number(enchantments[1].value) * Number(inputs[8].value);
	inputs[8].parentElement.lastElementChild.innerHTML = ` +${strike}%`;
	let giantk = Number(inputs[9].value) ? 25 : 0;
	inputs[9].parentElement.lastElementChild.innerHTML = ` +${giantk}%`;
	let prosecute = Number(inputs[10].value) ? 35 : 0;
	inputs[10].parentElement.lastElementChild.innerHTML = ` +${prosecute}%`;

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