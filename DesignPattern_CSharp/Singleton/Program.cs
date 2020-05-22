using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Singleton
{
    // anti pattern
    class Singleton
    {
        private Singleton() { }

        private static Singleton _instance;
        
        public static Singleton GetInstance()
        {
            if(_instance == null)
            {
                _instance = new Singleton();
            }
            return _instance;
        }
        public static void someBusinessLogic()
        {

        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Singleton s1 = Singleton.GetInstance();
            Singleton s2 = Singleton.GetInstance();

            if(s1 == s2)
            {
                Console.WriteLine("Singleton works, both use the same instance");
            }
            else
            {
                Console.WriteLine("Singleton failed, variables contain different instances");
            }
        }
    }
}
