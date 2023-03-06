// Shared
const squaredSign = String.fromCharCode(178);
const sqrtSign = String.fromCharCode(8730);
const ARBITRARY_THRESHOLD = 10;

const randomPolynomialGenerator = () => {
  let b, c, delta, sqrtDelta;
  b = Math.floor(Math.random() * 10);
  c = Math.floor(Math.random() * 10);
  delta = b ** 2 - 4 * c;
  sqrtDelta = Math.sqrt(delta);

  return { b, c, delta, sqrtDelta };
}

const sharedConditions = (values) => {
  return values.b !== 0 && values.c !== 0;
}

const polynomialSelector = (customConditions, customResult) => {
  let values, solutions;
  let match = false;

  while (match === false) {
    values = randomPolynomialGenerator();

    if (sharedConditions(values) && customConditions(values)) {
      match = true;
    }
  }

  solutions = customResult(values);
  console.log(`Équation: x${squaredSign} + ${values.b}x + ${values.c}`);
  if (solutions.one === solutions.two) {
    console.log(`Solution: ${solutions.one}`);
  } else {
    console.log(`Solutions: ${solutions.one}, ${solutions.two}`);
  }

  return 0;
}

// Squared Delta
const squareDeltaConditions = (values) => {
  return Number.isInteger(Math.sqrt(values.delta)) && !(values.delta < 0);
}

const squareDeltaResult = (values) => {
  return {
    one: (-values.b - values.sqrtDelta) / 2,
    two: (-values.b + values.sqrtDelta) / 2,
  };
}


// Non-squared Delta
  // Small
const smallDeltaConditions = (values) => {
  return (
    values.delta < ARBITRARY_THRESHOLD &&
    !Number.isInteger(Math.sqrt(values.delta)) &&
    values.delta > 0
  );
}

  // Big
const bigDeltaConditions = (values) => {
  return (
    values.delta >= ARBITRARY_THRESHOLD &&
    !Number.isInteger(Math.sqrt(values.delta)) &&
    values.delta > 0
  );
}

  // Both
const nonSquaredDeltaResults = (values) => {
  return {
    one: `(-${values.b} - ${sqrtSign}${values.delta}) / 2`,
    two: `(-${values.b} + ${sqrtSign}${values.delta}) / 2`,
  };
}

// Negative Delta
const negativeDeltaConditions = (values) => {
  return values.delta < 0;
}

const negativeDeltaResult = (values) => {
  complexDelta = -values.delta;
  complexSqrtDelta = Math.sqrt(complexDelta);
  customDelta = Number.isInteger(complexSqrtDelta)
    ? complexSqrtDelta
    : `${sqrtSign}${complexDelta}`;

  return {
    one: `(-${values.b} - ${customDelta}i) / 2`,
    two: `(-${values.b} + ${customDelta}i) / 2`,
  };
}

const main = () => {
  let type, amount;
  while (!(Number.isInteger(type) && type >= 0 && type <= 4)) {
    type = parseInt(
      prompt(
        `Quel type d'exercice voulez-vous générer? \n
      1. Déterminant carré
      2. Petit déterminant non carré
      3. Grand déterminant non carré (>= 10)
      4. Déterminant négatif
      0. Fin du programme`
      )
    );
  }
  if (type === 0) return 0;

  while (!(Number.isInteger(amount) && amount >= 0 && amount <= 10)) {
    amount = parseInt(
      prompt(
        `Nombre d'équations à générer: [1, 10] ?
      0. Fin du programme`
      )
    );
  }
  if (amount === 0) return 0;

  switch (type) {
    case 1:
      for (let i = 0; i < amount; i++) {
        polynomialSelector(squareDeltaConditions, squareDeltaResult);
      }
      break;

    case 2:
      for (let i = 0; i < amount; i++) {
        polynomialSelector(smallDeltaConditions, nonSquaredDeltaResults);
      }
      break;

    case 3:
      for (let i = 0; i < amount; i++) {
        polynomialSelector(bigDeltaConditions, nonSquaredDeltaResults);
      }
      break;

    case 4:
      for (let i = 0; i < amount; i++) {
        polynomialSelector(negativeDeltaConditions, negativeDeltaResult);
      }
      break;
  }

  return 0;
}

main();
