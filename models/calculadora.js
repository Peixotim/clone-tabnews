function sum(arg1 , arg2){

  if(!arg1 && !arg2){
    return 'Error , você não enviou nenhum número para efetuar a soma'
  }
  
  if(typeof arg1 != 'number'){
    return 'Error';
  }


  return arg1+arg2;
}

exports.somar = sum;