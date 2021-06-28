using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fullstack.Context;
using Fullstack.Models;
using Fullstack.Service.Interface;
using Fullstack.Service;

namespace Fullstack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
       
        IApi _Api;
        public UsersController(IApi Api)
        {
            _Api = Api;
         
        }

        // GET: api/Users
        [HttpGet]

      
            public async Task<JsonResult> GetUsers()
             {
               return   new JsonResult( await _Api.GetUsers());
           }
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _Api.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUser(int id, User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }
            try
            {
                user = await _Api.PatchUser(id, user);

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return  new ObjectResult(user);
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            await _Api.PostUser(user);
           

            return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _Api.DeleteUser(id);
            if (user == null)
            {
                return NotFound();
            }


            return NoContent();
        }

        private bool UserExists(int id)
        {
            return  _Api.UserExists(id);
        }
    }
}
