
import axios from 'axios';
import env from '../env';

class RandomService {

    constructor() {
        console.log("constructor for RandomService")
    }

    async getRandomInt() {
        let res = await axios.get(env.baseUrl + '/api/random');
        return res.data/*.then(
          (res) => {
            console.log(res.data)
          },
          (err) => {console.log(err)},
        );*/
    }
}

export default new RandomService();