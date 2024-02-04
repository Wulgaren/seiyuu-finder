const fs = require('fs');

// Read the file content
const data = fs.readFileSync('all.json', 'utf-8');

const parsed = Object.entries(JSON.parse(data));

function filterSeiyuu() {
  const natios = [
    "The Tatami Time Machine Blues",
    "The Tatami Galaxy",
    "Barakamon",
    "The Disastrous Life of Saiki K.",
    "Azumanga Daiou",
    "Life Lessons with Uramichi Oniisan",
    "The Way of the Househusband",
    "The Ingenuity of the Househusband",
    "Chainsaw Man",
    "My Dress-Up Darling",
    "Golden Boy",
    "Welcome to the N.H.K.",
    "Buddy Daddies",
    "Paradise Kiss",
    "One Outs",
    "The Disastrous Life of Saiki K.: Reawakened",
    "Monster",
    "NANA",
    "TRIGUN",
    "Michiko & Hatchin",
    "FLCL",
    "The Devil Is a Part-Timer!",
    "Kemonozume",
    "Samurai Champloo",
    "Neon Genesis Evangelion",
    "Texhnolyze",
    "Lain",
    "MushiShi",
    "Paranoia Agent",
    "Haibane Renmei",
    "xxxHOLiC",
    "Chobits",
    "Cowboy Bebop"
  ];

  const nicleo = [
    "pokemon",
    "blue period",
    "owari no seraph",
    "yuukoku no moriarty",
    "sasaki to miyano",
    "bungou stray dogs",
    "tomodachi game",
    "attack on titan",
    "the disastrous life of saiki k",
    "dakaichi",
    "jujutsu kaisen",
    "black butler",
    "spy x family",
    "vanitas no carte",
    "ron kamonohashi the deranged detective",
    "chainsaw man",
    "a girl and her guard dog",
    "great pretender",
    "horimiya",
    "buddy daddies",
    "wotakoi",
    "kuroko no basket",
    "terror in resonance",
    "death parade",
    "given",
    "paradox live",
    "my dress-up darling",
    "banana fish",
    "sk8 the infinity",
    "wolf girl and black prince",
    "yuri on ice",
    "high rise invasion",
    "free!",
    "the way of househusband",
    "life lessons with uramichi oniisan",
    "hitorijime my hero",
    "bleach",
    "blue lock",
    "sekaichii hatsukoi",
    "hetalia",
    "love stage",
    "a sign of affection",
    "barakamon",
    "junjou romantica",
    "cherry magic",
    "mashle",
    "super lovers",
    "gangsta.",
    "daily lives of high school boys",
  ];

  const our = [...natios, ...nicleo]
  const found = {}

  parsed.forEach(val => {
    let key = val[0]
    let value = val[1]

    our.forEach(x => {
      if (key.toLowerCase().includes(x.toLowerCase())) {
        found[key] = value
      }
    })
  })

  // Convert JSON object to a string
  const jsonString = JSON.stringify(found, null, 2); // The third parameter (2) is for indentation

  // Specify the file path where you want to save the JSON
  const filePath = 'filtered.json';

  // Write the JSON string to the file
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      console.log('JSON saved to file successfully!');
    }
  });
}

function findSeiyuuByName(animeData, name) {
  let res = [];

  animeData.forEach(val => {
    let key = val[0]
    let value = val[1]
    let nameFix = name.toLowerCase().trim()

    let foundSeiyuu = value?.find(person => {
      let seiyuu = person['seiyuu'].toLowerCase()
      let reverseName = nameFix.split(' ').reverse().join(' ')

      return seiyuu.includes(nameFix) || seiyuu.includes(reverseName)
    });

    if (foundSeiyuu) {
      res.push(key)
      // Break out of the loop if the person is found
      return;
    }
  });

  res = res.sort()

  if (res.length) {
    console.log(`\r\nPerson with name "${name}" found in: \r\n`);
    res.forEach(x => console.log("  - " + x))
    console.log("\r")
  } else {
    console.log(`Person with name "${name}" not found.`);
  }

  return res;
}

// findSeiyuuByName(parsed, 'daisuke ono');
// filterSeiyuu()