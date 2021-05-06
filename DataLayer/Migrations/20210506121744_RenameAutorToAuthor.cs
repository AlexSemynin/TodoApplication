using Microsoft.EntityFrameworkCore.Migrations;

namespace DataLayer.Migrations
{
    public partial class RenameAutorToAuthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Autor",
                table: "Slovechkos");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Slovechkos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Slovechkos");

            migrationBuilder.AddColumn<string>(
                name: "Autor",
                table: "Slovechkos",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
