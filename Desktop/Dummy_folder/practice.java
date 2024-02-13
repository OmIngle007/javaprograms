class pops{
	//1.int balance;
	int balance=0;
	static String surname;
	static boolean status;
	public static void main(String args[]){
		pops son=new pops();
		/*1.it will give 0
		System.out.println(son.balance);*/
		//all will print null
		System.out.println(surname);
		System.out.println(pops.surname);
		System.out.println(son.surname);
		//all will print false
		System.out.println(status);
		System.out.println(pops.status);
		System.out.println(son.status);
		int balance=34;
		//will print 10
		System.out.println(pops.fun());
		//2.
		System.out.println(son.getsurname(son));
		//3.
		System.out.println(son.getbalance(son));
	}
	//2.will print 10,null
	public String getsurname(pops obj){
		System.out.println(obj.fun());
		return obj.surname;
	}
	public static int fun(){
		return 10;
	}
	//3.will print 10,null,0
	public int getbalance(pops obj){
		System.out.println(getsurname(obj));
		return obj.balance;
	}
}

















