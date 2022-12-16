import axios from 'axios';

const REVIEWS_API_BASE_URL = "http://localhost:3000/reviews";

type recordsType = {
  productTitle: string,
  productId: string,
  productCategory: string,
  averageReviewScore: Number
  helpfulVotes: Number
}

type responseBody<T> = {
  datas: T,
  total: number
}

class ReviewsServices {

  async getReviews (params: any){
    const data = await axios.get<responseBody<recordsType[]>>(REVIEWS_API_BASE_URL + `?pageSize=${params.pageSize}&current=${params.current}&productCategory=${params.productCategory}&averageReviewScore=${params.averageReviewScore}`)
    return data;
  }

}

export default new ReviewsServices();