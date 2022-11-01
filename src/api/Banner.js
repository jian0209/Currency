import axios from 'axios';
import { BannerStore } from '../stores/BannerStore';

export const getBannerList = async () => {
  await axios
    .post('https://test.goduck.io/api/banner/getAll')
    .then((data) => {
      BannerStore.update((s) => {
        s.bannerList = data.data;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
