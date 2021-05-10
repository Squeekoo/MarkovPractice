/** Textual markov chain generator 
 * 
 * Should be able to test in Node:
 * > ".load markov.js"
 * Then, instantiate:
 * > let mm = new MarkovMachine("the cat in the hat");
 * 
 * > mm will result in:
 * MarkovMachine {
    words: [ 'the', 'cat', 'in', 'the', 'hat' ],
    chains: Map(4) {
      'the' => [ 'hat' ],
      'cat' => [ 'in' ],
      'in' => [ 'the' ],
      'hat' => [ undefined ]
    }
  }
  * 
  * 
*/

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    // Map object holds k:v pairs && remembers OG order of keys
    let chains = new Map();

    // Iterates over text
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
      // if (chains.has(word)) {
      //   chains.get(word).push(nextWord);
      // } else {
      //   // set() method adds/updates element w/ specified k:v to Map object
      //   chains.set(word, [nextWord]);
      // }
    }
    this.chains = chains;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let results = [];

    while (results.length < numWords && key !== null) {
      results.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return results.join(" ");
  }
}

module.exports = { MarkovMachine };
