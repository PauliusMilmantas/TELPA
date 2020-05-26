using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;
using TELPA.Entities;
using TELPA.Models;

namespace TELPA.Components
{
    public class SessionService : ISessionService, IDisposable
    {
        private ConcurrentDictionary<string, Session> sessions = new ConcurrentDictionary<string, Session>();
        private Timer timer;

        public SessionService()
        {
            timer = new Timer(
                callback: e => RemoveExpired(),
                state: null,
                dueTime: 5000,
                period: 5 * 60 * 1000);
        }

        public Session CreateSession()
        {
            Session session = new Session();
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                while (true)
                {
                    byte[] randomData = new byte[64];
                    rng.GetBytes(randomData);
                    string id = Convert.ToBase64String(randomData);
                    if (GetSession(id) == null)
                    {
                        session.Id = id;
                        break;
                    }
                }
            }
            session.ExpiryDate = DateTime.Now.AddMinutes(30);
            sessions[session.Id] = session;
            return session;
        }

        public Session GetSession(string id)
        {
            Session session = null;
            try
            {
                session = sessions[id];
            }
            catch (KeyNotFoundException) { }
            if (session != null)
            {
                session.ExpiryDate = DateTime.Now.AddMinutes(30);
            }
            return session;
        }

        public Session GetSession(Employee employee)
        {
            Session session = sessions.Values.FirstOrDefault(s => s.EmployeeId == employee.Id);
            if (session != null)
            {
                session.ExpiryDate = DateTime.Now.AddMinutes(30);
            }
            return session;
        }

        public void RemoveSession(string id)
        {
            sessions.TryRemove(id, out _);
        }

        public void RemoveExpired()
        {
            DateTime now = DateTime.Now;
            foreach (Session session in sessions.Values)
            {
                if (DateTime.Compare(now, session.ExpiryDate) <= 0)
                {
                    sessions.TryRemove(session.Id, out _);
                }
            }
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    timer.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~SessionService()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

    }
}
