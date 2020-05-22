using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adapter
{
    public interface ITarget
    {
        string GetRequest();
    }
    class Adaptee
    {
        public string GetSpecificRequest()
        {
            return "Specific request";
        }
    }
    class Adapter: ITarget
    {
        private readonly Adaptee _adaptee;

        public Adapter(Adaptee adaptee)
        {
            this._adaptee = adaptee;
        }
        public string GetRequest()
        {
            return $"This is '{this._adaptee.GetSpecificRequest()}'";
        }
    }
    class Program
    {
        // ITarget is the client interface
        // Adaptee implement the specific method
        // Adapter hide the concrete adpatee and provide an interface to client
        // Client rely on the Adapter
        // Adapter is open for adding new adaptee
        // Adapter provide an interface for client to call outside

        static void Main(string[] args)
        {
            Adaptee adaptee = new Adaptee();
            ITarget target = new Adapter(adaptee);

            Console.WriteLine("Adaptee interface is incompitable with the client.");
            Console.WriteLine("But with adapter client can call it's method");

            Console.WriteLine(target.GetRequest());
        }
    }
}
