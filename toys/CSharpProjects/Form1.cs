using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using CefSharp;
using CefSharp.WinForms;

namespace CefSharpWinform
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            this.chromiumWebBrowser1.Dock = DockStyle.Top;
            // chentoz : event handler with some problem
            // this.chromiumWebBrowser1.LoadingStateChanged += this.Browser_FrameLoadEnd;
            this.chromiumWebBrowser1.LoadingStateChanged += (sed, args) =>
            {
                if (args.IsLoading == false)
                {
                    //this.chromiumWebBrowser1.ExecuteScriptAsync("window.alert('yes');");
                }
            };
        }

        // FrameLoadEnd event will trigger for many times afer page is loaded
        private void Browser_FrameLoadEnd<LoadingStateChangedEventArgs>(object sender, FrameLoadEndEventArgs e)
        {
            // var jsCodeToExecute = "document.getElementById('kw').value = 'test';";
            // TODO : use jQuery by Default
            var jsCodeToExecute = "$('#kw').val('test');";

            if (e.Frame.IsMain)
            {
                e.Frame.ExecuteJavaScriptAsync(jsCodeToExecute);
            }
        }

        // key can't be processed, not working ...
        //protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        //{
        //    bool bHandled = false;
        //    switch(keyData)
        //    {
        //        case Keys.F5:
        //            browser.ShowDevTools();
        //            bHandled = true;
        //            break;
        //    }
        //    return bHandled;
        //}

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void Form1_Shown(object sender, EventArgs e)
        {
        }

        private void Form1_Close(object sender, EventArgs e)
        {
            Cef.Shutdown();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            if (this.chromiumWebBrowser1 !=null)
            {
                chromiumWebBrowser1.ShowDevTools();
            }
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void Button2_Click(object sender, EventArgs e)
        {
            if (this.chromiumWebBrowser1 != null)
            {
                chromiumWebBrowser1.ExecuteScriptAsyncWhenPageLoaded(this.textBox1.Text);
            }

        }

        private void Button3_Click(object sender, EventArgs e)
        {
            try
            {
                this.chromiumWebBrowser1.Load("www.bing.com");
                //document.getElementById('sb_form_q').value = 'yes';
                //document.getElementById('sb_form_go').click();

                this.chromiumWebBrowser1.ThrowExceptionIfBrowserNotInitialized();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
