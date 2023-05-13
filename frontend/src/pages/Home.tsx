import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./Home.css";
import { Survey } from '../interfaces/Survey';
// import { SurveyOptions } from '../interfaces/SurveyOptions';


const baseURL = "http://localhost:3000/api/v1"

function Home(){

     const [surveys, setSurveys] = useState<Survey[]>([]);
     const [surveyOptions, setSurveyOptions] = useState<Survey[]>([]);

     async function GetInfosTest(){

          


          try {
               const response = await axios.get(`${baseURL}/enquetes`);

               setSurveys(response.data.data);
               console.log(surveys[0].surveyOptions[0]);
               
          } catch (error) {
               console.log(error);
          }
     }


     useEffect(()=>{
          GetInfosTest()
     },[]);
     

     return(
          <div className="home">
               {surveys.length > 0 && surveys.map((survey:Survey)=>(
                    <div>
                         <h2 key={survey.dataValues.id}>{survey.dataValues.title}</h2>
                         {survey.surveyOptions.map(option=>(
                              <p>{option.surveyAnswerOption}</p>
                         ))}
                    </div>
                    
               ))}
          </div>
     );
}

export default Home;