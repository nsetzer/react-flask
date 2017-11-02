


import axios from 'axios';

class RandomService {

    async getRandomInt() {
        let res = await axios.get('http://localhost:5000/api/random');
        return res.data/*.then(
          (res) => {
            console.log(res.data)
          },
          (err) => {console.log(err)},
        );*/
    }
}

export default RandomService;