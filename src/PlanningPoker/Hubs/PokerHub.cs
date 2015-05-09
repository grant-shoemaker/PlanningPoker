using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanningPoker.Hubs
{
    public class PokerHub : Hub
    {
        private readonly static Dictionary<string, string> connections = new Dictionary<string, string>();
        private readonly static List<string> rooms = new List<string>();

        private string CurrentUsername
        {
            get {
                var x = connections.SingleOrDefault(c => c.Key == Context.ConnectionId);
                if (x.Equals(default(KeyValuePair<string, string>)))
                    return x.Value;
                return null;
            }
        }

        public void Login(string username)
        {
            if (connections.ContainsKey(Context.ConnectionId))
                connections[Context.ConnectionId] = username;
            else
                connections.Add(Context.ConnectionId, username);

            Clients.All.updateUserConnections(connections.Values);
            Clients.AllExcept(Context.ConnectionId).userConnect(username);
        }

        public void ConnectToRoom(string roomName)
        {
            //TODO: if the room doesn't exist, create it, otherwise add connection to group
            if (rooms.Contains(roomName))
            {
                //TODO: Add the connection to the room group
            } else
            {
                rooms.Add(roomName);
                Clients.All.listRooms(rooms);
            }
        }

        public void ListRooms()
        {
            Clients.Caller.listRooms(rooms);
        }

        public void UpdateDescription(string description)
        {
            Clients.All.descriptionUpdated(description);
        }

        public override Task OnConnected()
        {
            connections.Add(Context.ConnectionId, "TBD");
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            connections.Remove(Context.ConnectionId);
            Clients.All.updateUserConnections(connections.Values);

            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            if (!connections.ContainsKey(Context.ConnectionId))
            {
                Clients.All.updateUserConnections(connections.Values);
                string un = (CurrentUsername == null) ? "TBD" : CurrentUsername;
                connections.Add(un, Context.ConnectionId);
            }

            return base.OnReconnected();
        }
    }
}
