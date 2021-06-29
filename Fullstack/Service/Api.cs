using Fullstack.Models;
using Fullstack.Service.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack.Service
{
    public class Api :  IApi
    {
        private readonly Context.AppContext _context;

        public Api(Context.AppContext context)
        {
            _context = context;
        }

        [EnableCors]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        // GET: api/Users/5

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);



            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        public async Task<User> PatchUser(int id, User user)
        {

          
            _context.Entry(user).State = EntityState.Modified;

          
                await _context.SaveChangesAsync();
           
      



            return user;


        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        public async Task<User> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // DELETE: api/Users/5

        public async Task<User> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);


            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public bool  UserExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }
    }
}
