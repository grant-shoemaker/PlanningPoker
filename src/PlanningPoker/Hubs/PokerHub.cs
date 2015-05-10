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

        // rooms -> Key: roomName -> Value: list of ConnectionIds
        private readonly static Dictionary<string, List<string>> rooms = new Dictionary<string, List<string>>();

        private string getUsername(string connectionId)
        {
            var kvp = connections.SingleOrDefault(c => c.Key == connectionId);
            if (!kvp.Equals(default(KeyValuePair<string, string>)))
                return kvp.Value;
            return null;
        }

        private string currentUsername
        {
            get { return getUsername(Context.ConnectionId); }
        }

        private void removeRoomUser(string roomName)
        {
            var list = rooms[roomName];
            list.Remove(Context.ConnectionId);
            if (list.Count() == 0)
            {
                rooms.Remove(roomName);
                Clients.All.listRooms(rooms.Keys);
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

        public string GetUsername()
        {
            return currentUsername;
        }

        private IEnumerable<string> getRoomUsers(string roomName)
        {
            return rooms[roomName].Select(connId => getUsername(connId));
        }

        public async void ConnectToRoom(string roomName)
        {
            if (rooms.Keys.Contains(roomName))
            {
                rooms[roomName].Add(Context.ConnectionId);
            } else
            {
                rooms.Add(roomName, new List<string> { Context.ConnectionId });
                Clients.All.listRooms(rooms.Keys);
            }
            await Groups.Add(Context.ConnectionId, roomName);
            //TODO: notify single user added to room?
            Clients.Group(roomName).updateRoomUsers(getRoomUsers(roomName));
        }

        public async void DisconnectFromRoom(string roomName)
        {
            await Groups.Remove(Context.ConnectionId, roomName);
            removeRoomUser(roomName);
            if (rooms.ContainsKey(roomName))
                Clients.Group(roomName).updateRoomUsers(getRoomUsers(roomName));
            //else
                //TODO: notify single user leaving room?
        }

        public void ListRooms()
        {
            Clients.Caller.listRooms(rooms.Keys);
        }

        public void UpdateDescription(string roomName, string description)
        {
            Clients.Group(roomName).descriptionUpdated(description);
        }

        public void RequestVotes(string roomName)
        {
            Clients.Group(roomName).voteRequested();
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
                string un = (currentUsername == null) ? "TBD" : currentUsername;
                connections.Add(Context.ConnectionId, un);
            }

            return base.OnReconnected();
        }
    }
}
