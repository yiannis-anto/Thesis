#define WIN32

#include "std_lib_facilities.h"
#include <ostream>
#include "Simple_window.h"  
#include "Graph.h" 

using namespace Graph_lib;	

void MakeThePoints(vector<Point>& p, int side, int level, Point center)
{
	if (level == 0) { //If level  == 0 then will stop.
		  p.push_back(center); // Store the point in the vector.
	}
	else {
		//Making the points
		Point dist1((center.x - side / 3), (center.y - side / 3));
		Point dist2((center.x), (center.y - side / 3));
		Point dist3((center.x + side / 3), (center.y - side / 3));
		Point dist4((center.x - side / 3), (center.y));
		Point dist5((center.x + side / 3), (center.y));
		Point dist6((center.x - side / 3), (center.y + side / 3));
		Point dist7((center.x), (center.y + side / 3));
		Point dist8((center.x + side / 3), (center.y + side / 3));

		level = level - 1; // Decrease each time until find the points.
		side = side / 3; // Divide the edge with 3 to find the distance with the other squares.

		// Call function recursively.
		MakeThePoints(p, side, level, dist1);
		MakeThePoints(p, side, level, dist2);
		MakeThePoints(p, side, level, dist3);
		MakeThePoints(p, side, level, dist4);
		MakeThePoints(p, side, level, dist5);
		MakeThePoints(p, side, level, dist6);
		MakeThePoints(p, side, level, dist7);
		MakeThePoints(p, side, level, dist8);
	}
}

int main()
{
	Point tl(200, 50);	// Window size of Sierpinski’s carpet.
    Simple_window win(tl, 700, 700, "Sierpinski’s carpet");	// Make the window.

	// The edges of the square.
	Point s1(50, 50);
	Point s2(50, 400);
	Point s3(400, 50);
	Point s4(400, 400);

	Point Center(abs((s1.x + s3.x) / 2), abs((s1.y + s2.y) / 2)); // Find the center of the square.
	int level = 4;	// The number of subdivisions.
	int side = 300; // Size of the square in canvas.

	Marks m("X");	// Make the first square.
	m.add(Point(50, 50));
	m.add(Point(50, 400));
	m.add(Point(400, 50));
	m.add(Point(400, 400));
	win.attach(m); // Show  the first square.
	
	vector<Point> Vpoint; //Make the vector to store the points.

	MakeThePoints(Vpoint, side, level, Center); //Call the function.

	Marks star("."); //Make the carpet with "."
	for ( int i = 0; i < Vpoint.size(); i++)
        star.add(Vpoint[i]); //Add the points from the vector in the square
		
	win.attach(star); //Show the results in the screen.
	win.wait_for_button();	//Make the Next button.
	system("pause");
}
