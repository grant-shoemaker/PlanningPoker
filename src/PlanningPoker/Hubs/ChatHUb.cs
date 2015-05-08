using Microsoft.AspNet.SignalR;
using PlanningPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
    public class ChatHub : Hub
    {
        private readonly static Dictionary<string, string> _connections = new Dictionary<string, string>();

        private string Username
        {
            get
            {
                var x = _connections.SingleOrDefault(c => c.Key == Context.ConnectionId);
                if (x.Equals(default(KeyValuePair<string, string>)))
                    return x.Value;
                return null;
            }
        }

        public void Login(string Username)
        {
            _connections.Add(Context.ConnectionId, Username);
            Clients.All.updateUserConnections(_connections.Values);
            Clients.AllExcept(Context.ConnectionId).userConnect(Username);
        }

        public void Send(string message)
        {
            Clients.All.addNewMessageToPage(Username, message);
        }
        
        public override Task OnConnected()
        {

            //_connections.Add(Username, Context.ConnectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            //Clients.AllExcept(Context.ConnectionId).userDisconnect(Username);

            _connections.Remove(Context.ConnectionId);
            Clients.All.updateUserConnections(_connections.Values);

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            string un;
            if (!_connections.TryGetValue(Context.ConnectionId, out un))
            {
                //Clients.AllExcept(Context.ConnectionId).userReconnect(Username);

                Clients.All.updateUserConnections(_connections.Values);
                _connections.Add(Username, Context.ConnectionId);
            }

            return base.OnReconnected();
        }
    }
}
