
import axios from 'axios';

class RandomService {

    constructor() {
        console.log("constructor for RandomService")
    }

    async getRandomInt() {
        let res = await axios.get('http://localhost:4200/api/random');
        return res.data/*.then(
          (res) => {
            console.log(res.data)
          },
          (err) => {console.log(err)},
        );*/
    }
}

export default new RandomService();