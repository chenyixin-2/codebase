using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Threading;

using System.Net;
using System.Net.Sockets;

namespace eSubmission
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Start_Click(object sender, RoutedEventArgs e)
        {
            Thread thread = new Thread(UpdateText);
            thread.Start();
        }

        private void UpdateText()
        {
            String server = "127.0.0.1";
            String message = "";
            String response = "";

            try
            {
                // Create a TcpClient.
                // Note, for this client to work you need to have a TcpServer 
                // connected to the same address as specified by the server, port
                // combination.
                Int32 port = 1337;
                TcpClient client = new TcpClient(server, port);

                // Translate the passed message into ASCII and store it as a Byte array.

                // Get a client stream for reading and writing.
                //  Stream stream = client.GetStream();

                int tryouts = 100;
                while (tryouts > 0)
                {
                    tryouts--;

                    Thread.Sleep(TimeSpan.FromSeconds(5));

                    message = tryouts.ToString();

                    Byte[] data = System.Text.Encoding.ASCII.GetBytes(message);
                    NetworkStream stream = client.GetStream();

                    // Send the message to the connected TcpServer. 
                    stream.Write(data, 0, data.Length);

                    this.Dispatcher.BeginInvoke(new Action(() =>
                    {

                        Info.Text = "Sent: " + message;

                    }));

                    // Receive the TcpServer.response.

                    // Buffer to store the response bytes.
                    data = new Byte[256];

                    // String to store the response ASCII representation.
                    response = String.Empty;

                    // Read the first batch of the TcpServer response bytes.
                    Int32 bytes = stream.Read(data, 0, data.Length);
                    response = System.Text.Encoding.ASCII.GetString(data, 0, bytes);

                    this.Dispatcher.BeginInvoke(new Action(() =>
                    {

                        Info.Text = "Received: " + response;

                    }));

                    // Close everything.
                    stream.Close();
                }

                client.Close();
            }
            catch (ArgumentNullException e)
            {
                Console.WriteLine("ArgumentNullException: {0}", e);
            }
            catch (SocketException e)
            {
                Console.WriteLine("SocketException: {0}", e);
            }
        }
    }
}
