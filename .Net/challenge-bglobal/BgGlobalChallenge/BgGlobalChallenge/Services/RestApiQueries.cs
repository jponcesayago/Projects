using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BgGlobalChallenge.Models;
using static BgGlobalChallenge.Models.Custom.CustomModels;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace BgGlobalChallenge.Services
{
    public class RestApiQueries
    {

        private static string urlApi = "https://reqres.in/api/";

        public static async Task<List<userData>> Users(string[] pages)
        {
            try
            {
                List<userData> userData = new List<userData>();

                string query = "users?=page=";

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(urlApi);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                foreach (string page in pages)
                {
                    HttpResponseMessage response = await client.GetAsync(query + page);
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var reqresData = JsonConvert.DeserializeObject<reqresUsersData>(responseBody);

                    if (reqresData != null)
                    {
                        foreach (var item in reqresData.data)
                        {
                            userData.Add(item);
                        }
                    }

                }

                return userData;

            }
            catch(Exception e)
            {
                return null;
            }
        }


    }
}
