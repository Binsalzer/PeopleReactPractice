using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleReactPractice.Data;
using PeopleReactPractice.Web.Controllers.Models;

namespace PeopleReactPractice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connection;
        public PeopleController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }


        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepo(_connection);
            return repo.GetAllPeople();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepo(_connection);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(DeleteViewModel vm)
        {
            var repo = new PeopleRepo(_connection);
            repo.Delete(vm.Id);
        }

        [HttpPost]
        [Route("deleteAllChecked")]
        public void DeleteAllChecked(DeleteAllCheckedViewModel vm)
        {
            var repo = new PeopleRepo(_connection);
            repo.DeleteAllChecked(vm.Ids);
        }

        [HttpPost]
        [Route("edit")]
        public Person GetPersonById(EditViewModel vm)
        {
            var repo = new PeopleRepo(_connection);
            return repo.GetPersonById(vm.Id);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepo(_connection);
            repo.Update(person);
        }
    }
}
