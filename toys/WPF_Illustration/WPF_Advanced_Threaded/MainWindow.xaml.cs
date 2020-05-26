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

using System.ComponentModel;

namespace WPF_Advanced_Threaded
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private BackgroundWorker worker = null;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnDoSynchronousCalculation_Click(object sender, RoutedEventArgs e)
        {
            int max = 10000;
            pbCalculationProgress.Value = 0;
            lbResults.Items.Clear();

            int result = 0;
            for(int i=0; i<max; i++)
            {
                if (i % 42 == 0)
                {
                    lbResults.Items.Add(i);
                    result++;
                }
                System.Threading.Thread.Sleep(1);
                pbCalculationProgress.Value = Convert.ToInt32(((double)i / max) * 100);
            }
            MessageBox.Show("Numbers between 0 and 10000 divisible by 7:" + result);
        }

        private void btnDoAsynchronousCalculation_Click(object sender, RoutedEventArgs e)
        {
            pbCalculationProgress.Value = 0;
            lbResults.Items.Clear();

            worker = new BackgroundWorker();
            worker.WorkerReportsProgress = true;
            worker.WorkerSupportsCancellation = true;
            worker.DoWork += worker_DoWork;
            worker.ProgressChanged += worker_ProgressChanged;
            worker.RunWorkerCompleted += worker_RunWorkerCompleted;
            worker.RunWorkerAsync(10000); // 10000 is the argument of 
        }

        void worker_DoWork(object sender, DoWorkEventArgs e)
        {
            int max = (int)e.Argument;
            int result = 0;
            for (int i = 0; i < max; i++)
            {
                if (worker.CancellationPending == true) // <------------------- must do it in the loop as it's work loop
                {
                    e.Cancel = true;
                    return;
                }

                int progressPercentage = Convert.ToInt32(((double)i / max) * 100);
                if (i % 42 == 0)
                {
                    result++;
                    (sender as BackgroundWorker).ReportProgress(progressPercentage, i); // "i" here is UserState
                }
                else
                    (sender as BackgroundWorker).ReportProgress(progressPercentage);
                System.Threading.Thread.Sleep(1);

            }
            e.Result = result;
        }

        void worker_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            pbCalculationProgress.Value = e.ProgressPercentage;
            if (e.UserState != null) // if UserState is reported, then just add it to background
                lbResults.Items.Add(e.UserState);
        }

        void worker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            if(e.Cancelled)
            {
                lbResults.Foreground = Brushes.Red;
                lbResults.Items.Clear();
            }
            else
            {
                MessageBox.Show("Numbers between 0 and 10000 divisible by 7: " + e.Result);
                lbResults.Items.Add("Done... Calc result: " + e.Result);
            }
        }

        private void BtnAsynchronousCancel_Click(object sender, RoutedEventArgs e)
        {
            worker.CancelAsync();
        }
    }
}
