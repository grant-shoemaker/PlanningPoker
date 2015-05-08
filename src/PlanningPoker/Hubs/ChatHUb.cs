using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
    public class ChatHub : Hub  {
        public void Send(string message)
        {
            Clients.All.addNewMessageToPage(Username, message);
        }

        private string Username {
            get {
                return Context.RequestCookies.Get("pokerUsername");
            }
        }


        public override Task OnConnected()
        {
            Clients.All.userConnect(Username);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Clients.All.userDisconnect(Username);

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            Clients.All.userReconnect(Username);

            return base.OnReconnected();
        }
    }
}
