import axiosInstance from "../utils/axiosInterceptor";

const getAll = () => {
          return new Promise ((resolve, reject) => {
                    axiosInstance.get('/activity/getAllActivities')
                              .then(res => {
                                        resolve(res.data);
                              }).catch(err => {
                                        reject(err); 
                              })
          });
};



export const activityServices = {
     getAll,
};