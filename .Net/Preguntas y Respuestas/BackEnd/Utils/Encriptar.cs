using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Utils
{
    public static class Encriptar
    {
        public static string EncriptarPassword(string input)
        {
            MD5 md5Hash = MD5.Create();

            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder stringBuilder = new StringBuilder();

            for (int i= 0; i < data.Length; i++)
            {
                stringBuilder.Append(data[i].ToString("x2"));

            }
            return stringBuilder.ToString();
        }
    }
}
